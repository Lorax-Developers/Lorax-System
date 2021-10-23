import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm, Form } from "../useForm";

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  province: "",
  manufacturer: "",
};

export default function Manufacturer_ProfilingForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const { values, setValues, errors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  return (
    <Form onSubmit={handleSubmit}>
      <Controls.Select
        name="manufacturer"
        label="Manufacturer"
        value={values.manufacturer}
        onChange={handleInputChange}
      />
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            disabled
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            disabled
          />
          <Controls.Input
            label="Province"
            name="province"
            value={values.city}
            onChange={handleInputChange}
            disabled
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
