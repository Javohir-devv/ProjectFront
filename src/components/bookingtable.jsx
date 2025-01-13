import React, { useState, useEffect } from "react";
import "../style/TableBooking.scss";
import { SpinnerDotted } from "spinners-react";

const TableBooking = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true); // Yuklanish flagi

  useEffect(() => {
    // API chaqiruvini bajarish
    setLoading(true); // Yuklanishni boshlash
    fetch("https://project06.onrender.com/stol")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const formattedTables = data.data.stols.map((stol) => ({
            id: stol._id,
            number: stol.number,
            price: stol.price,
            status: "available", // Default status
            date: new Date(stol.createdAt).toISOString().split("T")[0], // Default date
          }));
          setTables(formattedTables);
        }
      })
      .catch((error) => console.error("Error fetching tables:", error))
      .finally(() => {
        setLoading(false); // Yuklanishni tugatish
      });
  }, []);

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const filteredTables = tables.filter((table) => {
    const isDateMatch = selectedDate ? table.date === selectedDate : true;
    const isStatusMatch = filter ? table.status === filter : true;
    return isDateMatch && isStatusMatch;
  });

  return (
    <div className="container">
      {loading ? (
        // Yuklanish animatsiyasi ko'rsatiladi
        <div className="loading-container">
        <SpinnerDotted size={59} thickness={180} speed={139} color="#36ad47" />
        </div>
      ) : (
        <div className="table-booking-container dark-theme">
          <div className="table-booking-header">
            <div className="status-filters">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
              />
              <button
                className={filter === "" ? "active" : ""}
                onClick={() => setFilter("")}
              >
                All tables
              </button>
              <button
                className={filter === "running" ? "active" : "running"}
                onClick={() => setFilter("running")}
              >
                Running order
              </button>
              <button
                className={filter === "available" ? "active" : "available"}
                onClick={() => setFilter("available")}
              >
                Available
              </button>
              <button
                className={filter === "billed" ? "active" : "billed"}
                onClick={() => setFilter("billed")}
              >
                Billed
              </button>
              <button
                className={
                  filter === "available-soon" ? "active" : "available-soon"
                }
                onClick={() => setFilter("available-soon")}
              >
                Available soon
              </button>
            </div>
          </div>

          <div className="main-content">
            <div className="restaurant-model">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  className={`table ${table.status} ${
                    selectedTable?.id === table.id ? "selected" : ""
                  }`}
                  onClick={() => handleTableClick(table)}
                >
                  <span>Table {table.number}</span>
                </div>
              ))}
            </div>

            <aside className="details-and-filter">
              <div className="selected-table-info">
                {selectedTable ? (
                  <>
                    <h3>Table {selectedTable.number}</h3>
                    <p>
                      <strong>Price:</strong> ${selectedTable.price}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedTable.status.replace("-", " ")}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedTable.date}
                    </p>
                    <button className="place-order-btn">Place Order</button>
                  </>
                ) : (
                  <p>Please select a table to see details.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBooking;
