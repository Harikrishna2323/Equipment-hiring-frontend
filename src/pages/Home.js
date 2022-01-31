import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllVehicles } from "../redux/actions/vehicleActions";
import { Row, Col, DatePicker } from "antd";

import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
  const { vehicles } = useSelector((state) => state.vehiclesReducer);
  const dispatch = useDispatch();
  const [totalVehicles, setTotalVehicles] = useState([]);

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  useEffect(() => {
    setTotalVehicles(vehicles);
  }, [vehicles]);

  console.log(totalVehicles);

  function setFilter(values) {
    // let selectedFrom = moment(values[0]).format("DD MM yyyy HH:mm");
    // let selectedTo = moment(values[1]).format("DD MM yyyy HH:mm");
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");
    console.log(selectedFrom);
    console.log(selectedTo);
    var temp = [];

    for (var vehicle of vehicles) {
      if (vehicle.bookedSlots.length === 0) {
        temp.push(vehicle);
      } else {
        for (let booking of vehicle.bookedSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(vehicle);
          }
        }
      }
    }
    setTotalVehicles(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-5" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="DD MM yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={20} className="mt-5">
        {totalVehicles.map((item) => {
          return (
            <Col lg={5} sm={24} xs={24} key={item._id}>
              <Fade bottom>
                <Pulse>
                  <div className="vehicle p-2 bs1 mt-50">
                    <img
                      src={item.image}
                      className="vehicleImg"
                      alt={item.name}
                    />

                    <div className="vehicle-content d-flex align-items-center justify-content-between">
                      <div className="text-left pl-2">
                        <p>{item.name}</p>
                        <p> Rent : {item.rent} /-</p>
                      </div>

                      <div>
                        <button className="btn1 mr-2">
                          <Link to={`/booking/${item._id}`}>Book Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Pulse>
              </Fade>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Home;

//
