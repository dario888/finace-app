import React from 'react'

const Footer= () => {
    return (
        <div className="footer">
            <div className="item" >
                <div id="usefulLinks">
                <h2>Useful Links</h2>
                    <a href="https://www.nbrm.mk/" target="_blank" rel="noopener noreferrer">
                        nbrm.mk
                    </a>
                    <a href="http://www.ujp.gov.mk/" target="_blank" rel="noopener noreferrer">
                        ujp.gov.mk
                    </a>
                    <a href="http://economy.gov.mk/" target="_blank" rel="noopener noreferrer">
                        economy.gov.mk
                    </a>
                    <a href="https://finance.gov.mk/" target="_blank" rel="noopener noreferrer">
                        finance.gov.mk
                    </a>
                </div>
               
                <div  id="aboutUs">
                    <h2>About Us</h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Amet tenetur ut vero ea quisquam numquam expedita quod aliquid exercitationem nisi,
                        Amet tenetur ut vero ea quisquam numquam expedita quod aliquid exercitationem nisi,
                        quasi odio itaque deserunt unde!
                    </p>
                </div>

                <div id="contactUs">
                    <h2 className="pb-3">Contact</h2>
                    <p>Phone: 5555-555</p>
                    <p>Adress: Street 1000, Mogadishu, Somalia </p>
                    <p>Email: finaceplanner@gmail.com</p>
                </div>
            </div>

            <div className="copyRight">
                <p>Copyright &copy; 2020. Made by Dick Steel</p>
            </div>
        </div>
    )
}

export default Footer
