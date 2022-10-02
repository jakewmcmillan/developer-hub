import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
//   StyledButton,
} from "./styles.js";

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action}>
      <StyledLabel htmlFor="categories">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="categories" name="categories">
        {props.children}
      </StyledSelect>
      {/* <StyledButton type="submit" value={props.buttonText} /> */}
    </DropdownWrapper>
  );
}

export function Option(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}