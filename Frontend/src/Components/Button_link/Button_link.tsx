
import "./../../style.css"
interface ButtonLinkProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  click?: () => void;
}

function Button_link({children, style, click} : ButtonLinkProps){

    return(
        <button className="button_link" onClick={click} style={style}>{children}</button>
    )
}

export default Button_link
