interface ButtonLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}


function Button_filter({children, onClick} : ButtonLinkProps){
    return(
        <div>
            <button onClick={onClick} className="button_filter">{children}</button>
        </div>
    )
}

export default Button_filter