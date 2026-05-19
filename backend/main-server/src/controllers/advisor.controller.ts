import { Request, Response } from "express";
import axios from "axios";

import { pool } from "../db";



/* ======================================================
   ADVISOR ANALYTICS
====================================================== */

export const getAdvisorAnalytics =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      `
    );

    let totalEquity = 0;
    let totalMF = 0;

    for(const investor of investors.rows){

      try {

        const equityResponse =
        await axios.get(
          `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
        );

        const mfResponse =
        await axios.get(
          `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
        );

        totalEquity +=
        equityResponse.data.total_value || 0;

        totalMF +=
        mfResponse.data.total_value || 0;

      } catch (serviceError) {

        console.log(serviceError);
      }
    }

    const totalWealth =
    totalEquity + totalMF;

    return res.status(200).json({

      success:true,

      analytics:{

        total_equity_value:
        totalEquity,

        total_mutual_fund_value:
        totalMF,

        total_wealth:
        totalWealth,

        diversification_ratio:{
          equity_percentage:
          totalWealth > 0
          ? ((totalEquity/totalWealth)*100).toFixed(2)
          : 0,

          mutual_fund_percentage:
          totalWealth > 0
          ? ((totalMF/totalWealth)*100).toFixed(2)
          : 0
        }
      }
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to fetch advisor analytics"
    });
  }
};



/* ======================================================
   DIVERSIFICATION ANALYSIS
====================================================== */

export const getDiversificationAnalysis =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      `
    );

    const diversificationData = [];



    for(const investor of investors.rows){

      try {

        const equityResponse =
        await axios.get(
          `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
        );

        const mfResponse =
        await axios.get(
          `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
        );

        const equityValue =
        equityResponse.data.total_value || 0;

        const mfValue =
        mfResponse.data.total_value || 0;

        const total =
        equityValue + mfValue;



        diversificationData.push({

          investor_name:
          investor.full_name,

          equity_percentage:
          total > 0
          ? ((equityValue/total)*100).toFixed(2)
          : 0,

          mutual_fund_percentage:
          total > 0
          ? ((mfValue/total)*100).toFixed(2)
          : 0,

          diversification_score:
          Math.abs(equityValue - mfValue) < total * 0.3
          ? "GOOD"
          : "MODERATE"
        });

      } catch (serviceError) {

        console.log(serviceError);
      }
    }



    return res.status(200).json({

      success:true,

      diversification_analysis:
      diversificationData
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed diversification analysis"
    });
  }
};



/* ======================================================
   RISK ANALYSIS
====================================================== */

export const getRiskAnalysis =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      `
    );

    const riskAnalysis = [];



    for(const investor of investors.rows){

      try {

        const equityResponse =
        await axios.get(
          `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
        );

        const mfResponse =
        await axios.get(
          `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
        );

        const equityValue =
        equityResponse.data.total_value || 0;

        const mfValue =
        mfResponse.data.total_value || 0;

        const total =
        equityValue + mfValue;



        let riskCategory = "LOW";

        if(equityValue > mfValue){

          riskCategory = "HIGH";
        }

        else if(
          equityValue === mfValue
        ){

          riskCategory = "MODERATE";
        }



        riskAnalysis.push({

          investor_name:
          investor.full_name,

          total_wealth:
          total,

          equity_exposure:
          equityValue,

          mutual_fund_exposure:
          mfValue,

          risk_category:
          riskCategory
        });

      } catch (serviceError) {

        console.log(serviceError);
      }
    }



    return res.status(200).json({

      success:true,

      risk_analysis:
      riskAnalysis
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed risk analysis"
    });
  }
};



/* ======================================================
   RECOMMENDATIONS
====================================================== */

export const getRecommendations =
async(
  req:Request,
  res:Response
) => {

  try {

    const investors =
    await pool.query(
      `
      SELECT *
      FROM unified_investors
      `
    );

    const recommendations = [];



    for(const investor of investors.rows){

      try {

        const equityResponse =
        await axios.get(
          `http://localhost:5001/api/equity/holdings/${investor.equity_investor_id}`
        );

        const mfResponse =
        await axios.get(
          `http://localhost:5002/api/mf/funds/${investor.mf_customer_ref}`
        );

        const equityValue =
        equityResponse.data.total_value || 0;

        const mfValue =
        mfResponse.data.total_value || 0;



        let recommendation =
        "Balanced portfolio";

        if(equityValue > mfValue * 2){

          recommendation =
          "Increase mutual fund allocation";
        }

        else if(mfValue > equityValue * 2){

          recommendation =
          "Increase equity exposure";
        }



        recommendations.push({

          investor_name:
          investor.full_name,

          recommendation
        });

      } catch (serviceError) {

        console.log(serviceError);
      }
    }



    return res.status(200).json({

      success:true,

      recommendations
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Failed to generate recommendations"
    });
  }
};