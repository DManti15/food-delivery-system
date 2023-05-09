const options = [
  { value: "hi-c", label: "Hi-C Te", price: 25 },
  { value: "hotdog", label: "Hot Dog", price: 35 },
  { value: "rapiditas", label: "Rapiditas", price: 30 },
  { value: "mission-muffin", label: "Mission Muffin", price: 50 },
  { value: "grilled-cheese", label: "Grilled Cheese", price: 25 },
  { value: "sandwich", label: "Sandwich", price: 30 },
  { value: "donuts", label: "Donuts", price: 25 },
  { value: "soda", label: "Soda", price: 30 },
  { value: "churros", label: "Churros", price: 20 },
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

export { options, customStyles };
