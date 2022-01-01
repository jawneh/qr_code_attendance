import styled from "styled-components"
import { device } from "../utils/ScreenDeviceSizes"

export const AbsoluteCenter = styled.div`
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 50vw;
  height: max-content;
  padding: 1rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #0275d8;

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
