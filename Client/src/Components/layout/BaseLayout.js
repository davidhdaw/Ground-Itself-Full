import "./styles/BaseLayoutStyles.scss"

const BaseLayout = ({ children }) => {
     console.log(children);

     return (
          <main className="base-layout-cont">
          {children}
          </main>
          )
}

export default BaseLayout