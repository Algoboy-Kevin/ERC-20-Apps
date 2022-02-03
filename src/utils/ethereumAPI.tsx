import Decimal from 'decimal.js';

export const applyDecimals = (rawValue:any, decimals:any, isPositive = false) => {
  if(!rawValue)
  return "";

  const ByFactor = new Decimal(isPositive ? decimals : -decimals)
  const Power = new Decimal(10).pow(ByFactor)
  const Result = new Decimal(rawValue).mul(Power)
  return Result.toFixed();
}

export const toDecimal = (rawValue:any, decimals:any, isPositive = false) => {

  if(!rawValue)
  return "";

  const ByFactor = new Decimal(isPositive ? decimals : -decimals)
  const Power = new Decimal(0.1).pow(ByFactor)
  const Result = new Decimal(rawValue).mul(Power).toFixed()
  return Result;
}