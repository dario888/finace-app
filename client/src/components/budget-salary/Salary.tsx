import React, {useState, useEffect, ChangeEvent} from 'react'





const Salary = () => {

    let [grossSalary, setGrossSalary] = useState(0)
    const [netSalary, setNetSalary] = useState(0)

    const grossMin = 20335;
    const netMin = 14000;
    
    const pensionFund = 0.188;
    const healthcareIns = 0.075;
    const employmentContributions = 0.012;
    const injuryInsurance = 0.005;
    const totalContributions = Math.round(grossSalary * (pensionFund + healthcareIns + employmentContributions + injuryInsurance));
    const grossDecreaseByContributions = grossSalary - totalContributions;
    const personalRelief = 8400;
    const taxBasisPersonalIncomeTax = grossDecreaseByContributions - (grossSalary > grossMin ? personalRelief : 0);
    const personalIncomeTax = parseInt((taxBasisPersonalIncomeTax * 0.1).toFixed());
    const totalContributionsAndTaxes = totalContributions + personalIncomeTax;

 
    
    useEffect(()=>{
        setNetSalary(grossSalary - totalContributionsAndTaxes)
        // eslint-disable-next-line
    },[totalContributionsAndTaxes, grossSalary])

    const changeGrossHendler = (e: ChangeEvent<HTMLInputElement>) =>  !e.target.value 
    ? setGrossSalary(0) : setGrossSalary(parseInt( e.target.value))    
     

    const changeNetHendler = (e: ChangeEvent<HTMLInputElement>) => 
    setNetSalary(parseInt(e.target.value) )
     

    
    //console.log(grossSalary)  
    return (
        <div className="containerSalary">
            <div className="inputSlalary">
                <div>
                    <label>Gross Salary</label>
                    <input type="number" value={grossSalary.toString()} onChange={changeGrossHendler}/>
                    {
                        grossSalary < grossMin && <p>Please insert amount bigger then 20335</p>
                    }
                </div>
                <div>
                    <label>Net Salary</label>
                    <input type="number" value={netSalary.toString()} onChange={changeNetHendler}/>
                    {
                        netSalary < netMin && <p>Please insert amount bigger then 14000</p>
                    }
                </div>
            </div>
            <table className="tblSalary">
                <tbody>
                <tr>
                    <td align="left">Gross</td>
                    <td></td>
                    <td>{grossSalary}</td>
                </tr>            
                <tr>
                    <td align="left">Pension fund</td>
                    <td>18.80%</td>
                    <td>{Math.round(grossSalary * pensionFund)}</td>
                </tr>            
                <tr>
                    <td align="left">Healthcare Insurance</td>
                    <td>7.50%</td>
                    <td>{Math.round(grossSalary * healthcareIns)}</td>
                </tr>            
                <tr>
                    <td align="left">Employment Contributions</td>
                    <td>1.20%</td>
                    <td>{Math.round(grossSalary * employmentContributions)}</td>
                </tr>            
                <tr>
                    <td align="left">Insurance in case of injury</td>
                    <td>0.50%</td>
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
                    <td>8400</td>
                </tr>            
                <tr>
                    <td align="left">Tax Basis for calculate Personal Income Tax</td>
                    <td></td>
                    <td>{taxBasisPersonalIncomeTax}</td>
                </tr>            
                <tr>
                    <td align="left">Personal Income Tax</td>
                    <td>10%</td>
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
                <td>{netSalary}</td>
                </tr>          
                </tbody>                 
            </table>
        </div>
    )
}

export default Salary
