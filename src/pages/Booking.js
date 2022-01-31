import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVehicles } from "../redux/actions/vehicleActions";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Row, Col, Divider, DatePicker, Modal } from "antd";
import moment from "moment";
import { bookVehicle } from "../redux/actions/bookingActions";
import { ToastContainer } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

const { RangePicker } = DatePicker;
const Booking = () => {
  const { vehicles } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const params = useParams();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  // const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [vehicle, setVehicle] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicles());
    if (vehicles.length > 0) {
      setVehicle(vehicles.find((i) => i._id === params.id));
      console.log(vehicle);
    }
  }, [params]);

  useEffect(() => {
    setTotalAmount(totalHours * vehicle.rent);
  }, [totalHours, vehicle.rent]);

  function selectTimeSlots(values) {
    console.log(moment(values[0]).format("DD MM yyyy HH:mm"));
    console.log(moment(values[1]).format("DD MM yyyy HH:mm"));
    setFrom(moment(values[0]).format("DD MM yyyy HH:mm"));
    setTo(moment(values[1]).format("DD MM yyyy HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }
  console.log(vehicle.bookedSlots);

  // function bookNow() {
  //   const reqObj = {
  //     user: JSON.parse(localStorage.getItem("user"))._id,
  //     vehicle: vehicle._id,
  //     totalHours,
  //     totalAmount,
  //     bookedTimeSlots: {
  //       from,
  //       to,
  //     },
  //   };
  //   dispatch(bookVehicle(reqObj));
  // }

  function onToken(token) {
    console.log(token);
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      vehicle: vehicle._id,
      totalHours,
      totalAmount,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookVehicle(reqObj));
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img
            className="vehicleImg2 bs1"
            src={vehicle.image}
            alt={vehicle.name}
          />
        </Col>
        <ToastContainer />
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal">Car Info</Divider>

          <Row
            justify="center"
            className="d-flex align-items-center justify-content-between"
          >
            <Col>
              <div className="text-left">
                <p>Name: </p>
                <p> Rent per Hour: </p>
                <p>fuel: </p>
                <p>Capacity:</p>
              </div>
            </Col>
            <Col>
              <div className="text-right">
                <p>{vehicle.name}</p>
                <p> {vehicle.rent} / hr</p>
                <p>{vehicle.fuelType}</p>
                <p>{vehicle.capacity}</p>
              </div>
            </Col>
          </Row>
          <Divider type="horizontal">Select Time Slots</Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="DD MM yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button className="btn1 mt-2 mr-5" onClick={() => setShowModal(true)}>
            See booked slots
          </button>
          {from && to && (
            <div className="justify-content-between mt-5 mb-5">
              <h1>Total Hours: {totalHours} hrs</h1>
              <p>
                Rent per Hour: <b>Rs- {vehicle.rent}</b>
              </p>

              <h3>Total Amount: {totalAmount}</h3>
            </div>
          )}

          <StripeCheckout
            shippingAddress
            amount={totalAmount * 100}
            token={onToken}
            stripeKey="pk_test_51KLB1HCLrFCRNjj7tFF1NNG7mfmdCMvKOB5wsFQty1xTpB4xMsTgyq8z28KHxhN0mkf1zw7IfZnnNUJzLjJtSgXn009fHKwIZa"
          >
            <button className="btn1">Book Now</button>
          </StripeCheckout>
        </Col>
        {vehicle.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked Time Slots"
          >
            {vehicle && (
              <div>
                {vehicle.bookedSlots.map((slot) => {
                  return (
                    <button className="btn1">
                      {slot.from} -- {slot.to}
                    </button>
                  );
                })}
              </div>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
};

export default Booking;
