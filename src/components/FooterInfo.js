
function check_a(is_a, children){
    if(is_a){    
        return <a href="/">{children}</a>;
    }
    else{
        return <div>{children}</div>;
    }
}
function FooterInfo({is_a = true, children}){
    
    return(
        <li className="app__home__container__rowfooter__component__item">
            {check_a(is_a, children)}
        </li>
    )
}


export default FooterInfo;