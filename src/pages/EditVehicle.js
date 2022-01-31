import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { getAllVehicles, editVehicle } from "../redux/actions/vehicleActions";
import { ToastContainer } from "react-toastify";

const EditVehicle = () => {
  const params = useParams();
  const { vehicles } = useSelector((state) => state.vehiclesReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [vehicle, setVehicle] = useState();
  const [totalVehicles, setTotalVehicles] = useState([]);
  useEffect(() => {
    if (vehicles.length === 0) {
      dispatch(getAllVehicles());
    } else {
      setTotalVehicles(vehicles);
      setVehicle(vehicles.find((o) => o._id === params.vehicleid));
      console.log(vehicle);
    }
  }, [vehicles]);

  function onFinish(values) {
    values._id = vehicle._id;

    dispatch(editVehicle(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <ToastContainer autoClose={1500} />
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalVehicles.length > 0 && (
            <Form
              initialValues={vehicle}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="rent" label="Rent" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
};
export default EditVehicle;
