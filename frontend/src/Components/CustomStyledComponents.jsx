import styled from "styled-components"
import { device } from "../utils/ScreenDeviceSizes"
import { NavLink as Link } from "react-router-dom"
import { PersonSquare } from "react-bootstrap-icons"
import { Button, Card } from "react-bootstrap"
export const primaryColor = "#2b1667"
export const secondaryColor = "#cab992"

export const AbsoluteCenter = styled.div`
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: ${props => props.max_width || "50vw"};
  height: max-content;
  padding: 0.5rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @media screen and ${device.mobileL} {
    max-width: 75vw;
  }
  @media screen and ${device.mobileM} {
    max-width: 75vw;
  }
  @media screen and ${device.mobileS} {
    max-width: 75vw;
  }
  @media screen and ${device.tablet} {
    max-width: 75vw;
  }
`

export const CustomButton = styled(Button)`
  background-color: ${primaryColor};
  border: none;
  color: #ffffff;
  transition: 0.3s;
  &:hover {
    background-color: ${secondaryColor};
    color: ${primaryColor};
  }
`
export const CustomQRCodeView = styled(Card)`
  align-items: center;
  background-color: #f4f4f4;
  height: 65vh;
  max-width: 50vw;
  min-width: 40vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;
  padding: 1rem;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`

export const CustomCard = styled(Card)`
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;
  padding: 1rem;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`
export const TopNavBar = styled.nav`
  background-color: ${primaryColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 100%;
  min-height: 7vh;
  max-height: 7vh;
  transition: 0.3s;
  padding: 1rem;
  z-index: 10;
  margin-bottom: 1rem;

  &:hover {
    min-height: 10vh;
  }

  @media screen and (max-width: 768px) {
  }
`
export const BrandMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`
export const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-center;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
    justify-content: flex-start;
  }
`
export const UserMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`
export const NavLink = styled(Link)`
  border-radius: 2px;
  padding: 0.5rem;
  margin: 1rem;
  color: #ffffff;
  display: block;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2 ease-in-out;
  text-decoration: none;
  outline: none;

  &.active {
    color: #15cdfc;
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    color: ${secondaryColor};
    border-bottom: 3px solid ${secondaryColor};
  }
`
export const CustomFaUserCog = styled(PersonSquare)`
  font-size: 1.7rem;
  border-radius: 2px;
  color: ${secondaryColor};
`
