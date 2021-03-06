import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteVehicle, getAllVehicles } from "../redux/actions/vehicleActions";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
const { RangePicker } = DatePicker;

const AdminHome = () => {
  const { vehicles } = useSelector((state) => state.vehiclesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalVehicles, setTotalVehicles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicles());
  }, []);

  useEffect(() => {
    setTotalVehicles(vehicles);
  }, [vehicles]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalVehicles.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="vehicle p-2 bs1">
                <img className="vehicleImg" src={car.image} alt="" />

                <div className="vehicle-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p> Rent Per Hour {car.rent} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/edit/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteVehicle({ vehicleid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default AdminHome;
