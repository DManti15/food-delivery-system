const options = [
  { value: "Hi-C Te", label: "Hi-C Te", price: 25 },
  { value: "Hot Dog", label: "Hot Dog", price: 35 },
  { value: "Rapiditas", label: "Rapiditas", price: 30 },
  { value: "Mission Muffin", label: "Mission Muffin", price: 50 },
  { value: "Grilled Cheese", label: "Grilled Cheese", price: 25 },
  { value: "Sandwich", label: "Sandwich", price: 30 },
  { value: "Donuts", label: "Donuts", price: 25 },
  { value: "Soda", label: "Soda", price: 30 },
  { value: "Churros", label: "Churros", price: 20 },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fdfdfd",
    borderRadius: 50,
    borderColor: "rgba(0, 7, 26, 0.25)",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    color: "rgba(0, 7, 26, 0.5)",
    fontSize: 16,
    textAlign: "left",
    fontWeight: 400,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 16,
  }),
  option: (provided, state) => ({
    ...provided,
    ...(state.options.indexOf(state.data) === 0 && {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }),
    ...(state.options.indexOf(state.data) === state.options.length - 1 && {
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    }),
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
    maxWidth: 432,
  }),
};

const altStyle = {
  control: (provided) => ({
    ...provided,
    borderRadius: 50,
    boxShadow: "none",
  }),
  container: (provided) => ({
    ...provided,
    width: "190px",
  }),
};

const tableStyle = {
  ...customStyles, 
  ...altStyle,
}

export { options, customStyles, tableStyle };
