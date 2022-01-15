import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  TopNavBar,
  NavLink,
  BrandMenu,
  NavMenu,
  UserMenu,
  CustomFaUserCog,
} from "./CustomStyledComponents"
import { Button, Dropdown } from "react-bootstrap"
import { Power, PersonFill, QrCode } from "react-bootstrap-icons"
import { userLogout } from "../redux/users/Actions"
const Header = () => {
  const dispatch = useDispatch()
  const { user_info } = useSelector(state => state.qrCodeUserLogin)
  const { is_admin, is_lecturer } = user_info

  const logoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <header>
      <TopNavBar>
        <BrandMenu>
          <NavLink to='/'>
            <QrCode size={40} />
          </NavLink>
        </BrandMenu>
        <NavMenu>
          <NavLink to='/'>
            <span>Dashbaord</span>
          </NavLink>
          {(is_admin || is_lecturer) && (
            <NavLink to='/reversals'>
              <span>Reports</span>
            </NavLink>
          )}
        </NavMenu>
        <UserMenu>
          <Dropdown>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              <CustomFaUserCog />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to='/profile'>
                  <p style={{ color: "#000" }}>
                    <PersonFill /> &nbsp; Profile
                  </p>
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                {is_admin && (
                  <NavLink to='/admin'>
                    <span style={{ fontSize: "20px", padding: "0.1rem", color: "#000" }}>
                      admin
                    </span>
                  </NavLink>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            onClick={logoutHandler}
            style={{ color: "red", fontSize: "24px", background: "#152a38" }}
          >
            <Power color='red' />
          </Button>
        </UserMenu>
      </TopNavBar>
    </header>
  )
}

export default Header
