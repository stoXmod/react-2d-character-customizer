import React, {useState} from "react";
import config from "../config";

import { PartTypes } from "@/components/PartTypes";
import { PartList } from "@/components/PartList";
import { ConfigPart } from "@/interfaces/Config";
import { PartColorSelector } from "@/components/PartColorSelector";

import classes from "./Selector.module.scss";

interface SelectorProps {
  addPart: (newPart: ConfigPart) => void;
  removePart: (removedPart: ConfigPart) => void;
  changeSkinTone: (newSkinTone: number) => void;
  skinTone?: number;
  partsArray: ConfigPart[];
  randomize: () => void;
  save: () => void;
  share: () => void;
  refresh: () => void;
}

const Selector = (props: SelectorProps) => {
  const [partType, setPartType] = React.useState<number>(0);
  const [openSection, setOpenSection] = useState<number | null>(null);


  const handleClick = (id: number) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
      <div className={classes.Selector}>
        {config.partTypes.map((PartType) => (
            <div key={PartType.id} className={`border-b border-gray-200`}>
              <button
                  className={`w-full py-3 px-2 text-left font-bold text-gray-700 hover:bg-gray-100 rounded focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${openSection === PartType.id ? 'bg-gray-300' : ''}`}
                  onClick={() => handleClick(PartType.id)}
              >
                {PartType.name}
              </button>
              {openSection === PartType.id && (
                  <div className={'text-left'}>
                    <React.Fragment>
                      <PartList
                          parts={config.parts}
                          partType={openSection}
                          addPart={props.addPart}
                          removePart={props.removePart}
                          skinTone={props.skinTone}
                          partsArray={props.partsArray}
                      ></PartList>
                      <PartColorSelector
                          parts={config.parts}
                          partType={openSection}
                          addPart={props.addPart}
                          skinTone={props.skinTone}
                          partsArray={props.partsArray}
                          setSkinTone={props.changeSkinTone}
                      ></PartColorSelector>
                    </React.Fragment>
                  </div>
              )}
            </div>
        ))}

      </div>
  );
};

export default Selector;
