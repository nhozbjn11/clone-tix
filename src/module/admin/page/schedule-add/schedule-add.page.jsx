import dateFormat from 'dateformat'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getScheduleCinemAction, getScheduleCreateAction, getScheduleTheaterAction } from '../../../../store/actions/schedule-manage.action'
import "./schedule-add.style.scss"

export default function ScheduleAdd() {
    const dispatch = useDispatch()
    const { id, tenPhim } = useParams()
    const [ticketDetail, setTicketDetail] = useState({
        maPhim: id,
        ngayChieuGioChieu: {},
        maRap: "",
        giaVe: "",
    })
    const [cinemaTheater, setCinemaTheater] = useState()
    useEffect(() => {
        dispatch(getScheduleTheaterAction())
    }, [])
    const { listTheater } = useSelector(state => state.schedule)
    const { listCinema } = useSelector(state => state.schedule)
    const listNumberCinema = listCinema?.filter(cine => cine.maCumRap === cinemaTheater)
    const renderListTheater = () => listTheater?.map((theater, index) => (
        <option key={index} value={theater.maHeThongRap}>{theater.maHeThongRap}</option>
    ))
    const getTheaterCinema = (event) => {
        dispatch(getScheduleCinemAction(event.target?.value))
        document.getElementById("maCumRap").value = ""
        document.getElementById("maRap").value = ""
    }
    const renderListCinema = () => listCinema?.map((cinema, index) => (
        <option value={cinema.maCumRap} key={index}>{cinema.tenCumRap}</option>
    ))

    const renderListNumberCinema = listNumberCinema[0]?.danhSachRap.map((cine, index) => (
        <option value={cine.maRap} key={index}>{cine.maRap} - {cine.tenRap}</option>
    ))
    const handleChange = (event) => {
        const { value, name } = event.target
        if (name === "ngayChieuGioChieu") {
            setTicketDetail({
                ...ticketDetail,
                [name]: dateFormat(new Date(value), "dd/mm/yyyy hh:mm:ss")
            })
        } else {
            setTicketDetail({
                ...ticketDetail,
                [name]: value
            })
        }
    }
    const history = useHistory()
    const handleSubmitForm = (event) => {
        event.preventDefault()
        dispatch(getScheduleCreateAction(ticketDetail, history, id, tenPhim))
    }
    return (
        <section className="schedule__add">
            <div className="schedule__add--header text-center" style={{ width: "100%" }}>
                <h1>Thêm lịch chiếu vào phim</h1>
                <h3>Sau khi xác nhận không thể hoàn tác</h3>
            </div>
            <div className="schedule__add-content">
                <p>Phim: <span>{tenPhim}</span></p>
                <p>Mã Phim: <span>{id}</span></p>
                <form onSubmit={handleSubmitForm} className="schedule__add--form">
                    <div className="form__group">
                        <label htmlFor="heThongRap">Hệ thống rạp</label>
                        <select onChange={getTheaterCinema} required className="form__value" type="text" id="heThongRap" name="ngayChieuGioChieu" >
                            <option selected disabled hidden>Vui lòng chọn Hệ Thống Rạp...</option>
                            {renderListTheater()}
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="maCumRap">Cụm rạp</label>
                        <select onChange={() => setCinemaTheater(document.getElementById("maCumRap").value)} required className="form__value" type="text" id="maCumRap" name="maCumRap" >
                            <option selected disabled hidden value="">Vui lòng chọn Cụm Rạp...</option>
                            {renderListCinema()}
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="maRap" >Mã rạp</label>
                        <select required className="form__value" type="text" id="maRap" name="maRap" onChange={handleChange}>
                            <option selected disabled hidden value="">Vui lòng chọn Mã Rạp...</option>
                            {renderListNumberCinema}
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="ngayChieuGioChieu">Ngày chiếu giờ chiếu</label>
                        <input required className="form__value" type="datetime-local" id="ngayChieuGioChieu" name="ngayChieuGioChieu" onChange={handleChange} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="giaVe">Giá Vé</label>
                        <select required className="form__value" type="text" id="giaVe" name="giaVe" onChange={handleChange}>
                            <option value="">Vui lòng chọn giá vé...</option>
                            <option value={75000}>75000</option>
                            <option value={80000}>80000</option>
                            <option value={90000}>90000</option>
                            <option value={120000}>120000</option>
                        </select>
                    </div>
                    <div className="form__group submit">
                        <button className="btn btn-success">Xác nhận</button>
                        <NavLink to="/admin/movie-management/edit" className="btn btn-danger">Quay lại</NavLink>
                    </div>
                </form>
            </div>

        </section>
    )
}