import "./styles/CustomButton.scss"

const CustomButton = ({ title, onClick }) => {

     return (
          <button
               className="btn"
               onClick={onClick}
          >
               {title}
          </button>
     )
}

export default CustomButton