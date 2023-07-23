import "./styles/CustomBoxStyles.scss"

const CustomBox = ({ children }) => {
  return (
     <section className="custom-box">
          {children}
     </section>
  )
};

export default CustomBox;
