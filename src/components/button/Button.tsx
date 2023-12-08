import React, { HTMLProps } from "react";
import "./button.scss";
import classNames from "classnames";
import styled, { css } from "styled-components";

type buttontype = {
  children: React.ReactNode;
  $size?: 'medium' | 'small',
  theme?: 'primary' | 'secondary',
  $full?: boolean,
} & HTMLProps<HTMLButtonElement>;

const StyledButton = styled.button<buttontype>`
  ${(props) =>
    props.$full &&
    css`
      width: 100%;
  `}

  ${(props) =>
    props.theme === 'primary' &&
    css`
      background: var(--primary-color);
      color: white;
  `}

  ${(props) =>
    props.$size === 'medium' &&
    css`
      height: 36px;
  `}
`;

const Button = ({ children, $size = "medium", theme = 'primary', $full, onClick, disabled, ...attr }: buttontype) => {
  return (
    <StyledButton
      $full={$full}
      theme={theme}
      $size={$size}
      {...attr}
      className={classNames("btn", {
        "is-medium": $size === "medium",
      })}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
