import { ReportService } from '../../../../redux/services/reportService'
import './style.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
var format = require('date-format');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default function ReportChoose(){
    //So luong ban
    const [startDateRank, setStartDateRank] = useState(new Date());
    const [endDateRank, setEndDateRank] = useState(new Date());
    
    function handleRank(){
        ReportService.createReportRank({
            from: format.asString('yyyy-MM-dd',startDateRank ),
            to: format.asString('yyyy-MM-dd',endDateRank )
        })
        // console.log("startDateRank: ",startDateRank.toISOString().slice(0,10))
        // console.log("endDateRank: ",endDateRank.toISOString().slice(0,10))
        // console.log("startDateRank: ",startDateRank)
        // console.log("startDateRank B: ",format.asString('yyyy-MM-dd',startDateRank ))

    }

    //End so luong ban

    //Doanh thu ngay
    const [startDateRevenue, setStartDateRevenue] = useState(new Date());
    const [endDateRevenue, setEndDateRevenue] = useState(new Date());
    function handleRevenue(){
        ReportService.createReportRevenue({
            from: format.asString('yyyy-MM-dd',startDateRevenue ),
            to:format.asString('yyyy-MM-dd',endDateRevenue )
        })
        // console.log("startDateRank: ",(new Date(startDateRank)).toISOString().slice(0,10))
        // console.log("endDateRank: ",(new Date(endDateRank)).toISOString().slice(0,10))

    }
    //End doanh thu ngay

    function handleProfit(){
        ReportService.createReportProfit()
    }
    function handleStock(){
        ReportService.createReportStock()
    }

    function handler(e) {
        alert(e.target.value);
     }
    return(
        <div className="report-choose-container">
            <h2 className="page-header">Report and statistical</h2>

            <div className="row-hh">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <div className="row-hh">

                                <div className="container-btn rank-container col-3">
                                    <div className="til">THỐNG KÊ SỐ LƯỢNG BÁN</div>
                                    <div className="choo-day">
                                        <DatePicker selected={startDateRank} onChange={(date) => setStartDateRank(date)} />
                                        <DatePicker selected={endDateRank} onChange={(date) => setEndDateRank(date)} />
                                        <div className="btn-act-report m" onClick={handleRank}>Render Report</div>
                                    </div>
                                    {/* <input type="date" id="dt" onchange="handler(event);" /> */}

                                </div>

                                <div className="container-btn revenue-container col-3">
                                    <div className="til">DOANH THU THEO NGÀY</div>
                                    <div className="choo-day">
                                        <DatePicker selected={startDateRevenue} onChange={(date) => setStartDateRevenue(date)} />
                                        <DatePicker selected={endDateRevenue} onChange={(date) => setEndDateRevenue(date)} />
                                        <div className="btn-act-report m" onClick={handleRevenue}>Render Report</div>
                                    </div>
                                </div>
                                <div className="container-btn stock-container col-3">
                                    <div className="til">TỒN KHO</div>
                                    <div className="btn-act-report" onClick={handleStock}>Render Report</div>

                                </div>
                                <div className="container-btn Profit-container col-3">
                                    <div className="til">LỢI NHUẬN</div>
                                    <div className="btn-act-report" onClick={handleProfit}>Render Report</div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}