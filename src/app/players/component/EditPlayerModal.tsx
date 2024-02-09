"use client";

import { addPlayer } from "@/app/lib/actions";
import { Player } from "@/app/lib/types";
import { useState } from "react";
const EditPlayerModal: React.FC<{}> = () => {
  return (
    <div sx={{ width: "400px", height: "400px" }}>
      <form onSubmit={} className="new-user-card-content ">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={""}
            onChange={}
            required
          />
        </div>
      </form>
    </div>
  );
};
export default EditPlayerModal;
