import React from "react";
import { ConfigPart } from "../interfaces/Config";
import classNames from 'classnames';
import classes from "./PartList.module.scss";
import configUtils from "../utils/configUtils";

interface PartListProps {
  parts: ConfigPart[];
  addPart: (newPart: ConfigPart) => void;
  removePart: (removedPart: ConfigPart) => void;
  partType: number;
  skinTone?: number;
  partsArray: ConfigPart[];
}

export const PartList = (props: PartListProps) => {
  const { filter, reduce } = configUtils;

  const urlPrefix = process.env.NEXT_PUBLIC_PUBLIC_URL + "/character_parts";

  return (
    <div>
      <div className={classes.partList}>
        {props.parts
          .filter(part => filter.byPartType(part, props.partType))
          .filter(part => filter.bySkinTone(part, props.skinTone ?? 0))
          .filter(part => filter.byBodyShape(part, props.partsArray))
          .reduce(reduce.byPartName, [])
          .map((part, index) => (
            <div
              key={index}
              className={
                props.partsArray.some(layer => layer.name === part.name)
                  ? classes.partItemSelected
                  : classes.partItem
              }
              onClick={() => {
                if (props.partsArray.some(layer => layer.name === part.name)) {
                  props.removePart(part);
                } else {
                  props.addPart(part);
                }
              }}
            >
              <img
                  src={urlPrefix + "/" + part.images[0
                      ].filename + ".png"}
                  alt={part.name}
                  className={classNames([
                    classes[part.name.split(' ')[0]], classes.characterPartImage], part.name.split(' ')[0])}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
