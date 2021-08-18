
import React, { Component } from 'react'
import { bannerMovie } from '../../../../config/banner.config'
import "./modal.style.scss"
import Slider from 'react-slick'
import ModalCard from './modal.component'

export default class Banner extends Component {
    renderImg = bannerMovie.map((banner, index) => (
        <div className="banner__item" key={index}>
            <img src={banner.img} alt="banner movie" className="modalMovie__img" />
            <ModalCard src={banner.src} />
        </div >
    ))
    settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        dots: true,
    }
    render() {
        return (
            <>
                <Slider {...this.settings}>
                    {this.renderImg}
                </Slider>
            </ >
        )
    }
}
