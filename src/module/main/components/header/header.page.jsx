import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import "./header.style.scss"
import avatar from '../../../../img/avatar.png'
import logo from '../../../../img/logo.png'
import images from '../../../../img/images.png'


export default function Header() {
    //press the title to scroll to title you pressed
    let overlayToggle = false

    const scrollToId = (id) => {
        overlayToggle = !overlayToggle
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({
                behavior: "smooth"
            })
            document.querySelector(".navbar__overlay").style.display = "none"
            document.querySelector(".navbar-collapse").classList.remove("show")
        }
    }
    //press the menu to open overlay
    const toggleOverlay = () => {
        overlayToggle = !overlayToggle
        if (overlayToggle) {
            document.querySelector(".navbar__overlay").style.display = "block"
        } else {
            document.querySelector(".navbar__overlay").style.display = "none"
        }
    }
    //press the logo to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    //add sticky class when scroll out the header
    const scrollSticky = () => {
        const header = document.querySelector(".header")
        if (window.scrollY > 100) {
            header.classList.add("sticky")
        } else {
            header.classList.remove("sticky")
        }
    }
    window.addEventListener("scroll", scrollSticky)


    return (
        <>
            <nav className="navbar header navbar-expand-lg" >
                <NavLink className="navbar-brand" to="/" onClick={() => scrollToTop()}>
                    <img src={logo} alt="" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => toggleOverlay()}>
                    <img src={images} alt="" />
                </button>

                <div className="navbar__overlay"></div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav sign">
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link sign__item" to="/sign-in">
                                <img src={avatar} alt="" />Đăng nhập</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link sign__item" to="/sign-up">Đăng ký</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar__menu">
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link" to="/#listMovie" onClick={() => scrollToId("listMovie")}>Lịch Chiếu</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link" to="/#theaterMain" onClick={() => scrollToId("theaterMain")}>Cụm Rạp</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link" to="/#news" onClick={() => scrollToId("news")}>Tin tức</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="nav-link-active" className="
                                nav-link" to="/#ads" onClick={() => scrollToId("ads")}>Ứng dụng</NavLink>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

