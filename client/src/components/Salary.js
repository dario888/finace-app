import React, {useState, useEffect, ChangeEvent} from 'react'





const Salary = () => {

    const [inputGross, setInputGross] = useState(0)
    const [grossSalary, setGrossSalary] = useState(0)
    const [netSalary, setNetSalary] = useState(0)
    const [calcNetAmount, setCalcNetAmount] = useState(0)

    const grossMin = 19159;
    const netMin = 13238;
    
    const pensionFund = 0.188;
    const healthcareIns = 0.075;
    const employmentContributions = 0.012;
    const injuryInsurance = 0.005;
    const totalContributions = Math.round(grossSalary * (pensionFund + healthcareIns + employmentContributions + injuryInsurance));
    const grossDecreaseByContributions = grossSalary - totalContributions;
    const personalRelief = 8228;
    const taxBasisPersonalIncomeTax = grossDecreaseByContributions - (grossSalary >= grossMin ? personalRelief : 0);
    const personalIncomeTax = Math.round(taxBasisPersonalIncomeTax * 0.1);
    const totalContributionsAndTaxes = totalContributions + personalIncomeTax;

    // netToGross = grossSalary
    const netToGross = calcNetAmount >= netMin
    ? Math.round( (calcNetAmount + (calcNetAmount-8228) / 0.9 * 0.1) / 0.72 )
    : 0

    const displayGross = inputGross > grossMin ? inputGross : 0
    // console.log(displayGross) 

    //Calculating salary from Gross to Net
    useEffect(()=>{
        setNetSalary(grossSalary - totalContributionsAndTaxes)
        // eslint-disable-next-line
    },[grossSalary, totalContributionsAndTaxes])
    
    //inputGross = grossSalary
    useEffect(()=>{
        setGrossSalary(displayGross)
        // eslint-disable-next-line
    },[displayGross])

    //Calculating from Net to Gross
    useEffect(()=>{
        setGrossSalary(netToGross)
        // eslint-disable-next-line
    },[netToGross])
   
    
    const changeGrossHendler = (e: ChangeEvent<HTMLInputElement>) => !e.target.value
     ? setInputGross(0) : setInputGross( Math.abs(parseInt(e.target.value)) )  

     
    const changeNetHendler = (e: ChangeEvent<HTMLInputElement>) => !e.target.value
    ? setCalcNetAmount(0) : setCalcNetAmount(Math.abs(parseInt(e.target.value)) )
     
    const clickResetHendler = () => {
        setGrossSalary(0)
        setNetSalary(0)
        setCalcNetAmount(0)
        setInputGross(0)
    }
    

    return (
        <div className="containerSalary">
            <div className="inputSalary">
                <div>
                    <label>Gross Salary</label>
                    <input type="number" 
                    value={ inputGross ? inputGross.toString() : grossSalary.toString()  } 
                    onChange={changeGrossHendler}/>
                    {
                        grossSalary < grossMin && <p>Please insert amount bigger or equal to 19160</p>
                    }
                </div>
                <div>
                    <label>Net Salary</label>
                    <input type="number" value={calcNetAmount ? calcNetAmount.toString() : netSalary.toString()} onChange={changeNetHendler}/>
                    {
                        netSalary < netMin ? <p>Please insert amount bigger or equal to 13238</p> 
                        :  null 
                    }
                </div>
                
            </div>
            <div className="divBtnReset">
                <button className="salaryReset btnHover" onClick={clickResetHendler}>
                    Reset Salary
                </button>
            </div>
            <table className="tblSalary">
                <tbody>
                <tr>
                    <td align="left">Gross</td>
                    <td></td>
                    <td className="textOrn">{ grossSalary }</td>
                </tr>            
                <tr>
                    <td align="left">Pension fund</td>
                    <td className="textOrn">18.80%</td>
                    <td>{Math.round(grossSalary * pensionFund)}</td>
                </tr>            
                <tr>
                    <td align="left">Healthcare Insurance</td>
                    <td className="textOrn">7.50%</td>
                    <td>{Math.round(grossSalary * healthcareIns)}</td>
                </tr>            
                <tr>
                    <td align="left">Employment Contributions</td>
                    <td className="textOrn">1.20%</td>
                    <td>{Math.round(grossSalary * employmentContributions)}</td>
                </tr>            
                <tr>
                    <td align="left">Insurance in case of injury</td>
                    <td className="textOrn">0.50%</td>
                    <td>{Math.round(grossSalary * injuryInsurance)}</td>
                </tr>            
                <tr>
                    <td align="left">Total Contributions</td>
                    <td></td>
                    <td>{totalContributions}</td>
                </tr>            
                <tr>
                    <td align="left">Gross Salary decrease by Contributions</td>
                    <td></td>
                    <td>{grossDecreaseByContributions}</td>
                </tr>            
                <tr>
                    <td align="left">Personal Relief</td>
                    <td></td>
                    <td className="textOrn">8228</td>
                </tr>            
                <tr>
                    <td align="left">Tax Basis for calculate Personal Income Tax</td>
                    <td></td>
                    <td>{taxBasisPersonalIncomeTax}</td>
                </tr>            
                <tr>
                    <td align="left">Personal Income Tax</td>
                    <td className="textOrn">10%</td>
                    <td>{personalIncomeTax}</td>
                </tr>            
                <tr>
                    <td align="left">Total Contributions and Taxes</td>
                    <td></td>
                    <td>{totalContributionsAndTaxes}</td>
                </tr>            
                <tr>
                    <td align="left">Net Salary</td>
                    <td></td>
                <td className="textOrn">{netSalary}</td>
                </tr>          
                </tbody>                 
            </table>
        </div>
    )
}

export default Salary
