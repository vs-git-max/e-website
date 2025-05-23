import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import React, { Fragment } from "react";

const Filter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background rounder-lg shadow-sm">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 ">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bolde">{keyItem}</h3>
            </div>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((option) => (
                <Label className="flex items-center gap-2 font-medium">
                  <Checkbox
                    checked={
                      filter &&
                      Object.keys(filter).length > 0 &&
                      filter[keyItem] &&
                      filter[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>

            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Filter;
