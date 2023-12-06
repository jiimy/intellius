import React, { HTMLProps, forwardRef, Ref } from "react";
import "./input.scss";
import classNames from "classnames";

type InputType = {
  children?: React.ReactNode;
  label?: string;
  classname?: string;
} & HTMLProps<HTMLInputElement>;

export const InputText = forwardRef(({ label, ...attr }: InputType, ref: Ref<HTMLInputElement>) => {

  return (
    <div className="input-wrap">
      {label && <label style={{ 'fontWeight': '600' }}>{label}</label>}
      <input {...attr} ref={ref} />
    </div>
  );
});

export const InputCheck = forwardRef(({ label, classname, ...attr }: InputType, ref: Ref<HTMLInputElement>) => {
  return (
    <div className={classNames('input-wrap checkbox', classname)}>
      <label htmlFor={attr.id}>
        <input type="checkbox" {...attr} ref={ref} />
        <span></span>
        <span className="label">{label}</span>
      </label>
    </div>
  );
});
