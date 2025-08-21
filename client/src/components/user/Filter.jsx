import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const Filter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold ">Filters</h2>
      </div>
      <div className="p-4 space-y-4 ">
        {Object.keys(filterOptions).map((key) => (
          <Fragment key={key}>
            <div className="">
              <h3 className="text-base font-bold">{key}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[key].map((option) => (
                  <Label className="flex items-center gap-2 font-medium">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[key] &&
                        filters[key].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(key, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Filter;
