/* eslint-disable @typescript-eslint/no-empty-object-type */
import type React from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StyleJSX {
  export type ElementType = React.JSX.ElementType;
  export interface Element extends React.JSX.Element {}
  export interface ElementClass extends React.JSX.ElementClass {}
  export interface ElementAttributesProperty
    extends React.JSX.ElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends React.JSX.ElementChildrenAttribute {}
  export type LibraryManagedAttributes<C, P> =
    React.JSX.LibraryManagedAttributes<C, P>;
  export interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T> extends React.JSX
    .IntrinsicClassAttributes<T> {}

  export type IntrinsicElements = {
    [key in keyof React.JSX.IntrinsicElements]: React.JSX.IntrinsicElements[key] & {
      css?: string;
    };
  };
}
