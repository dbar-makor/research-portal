import { useState } from 'react'

function WorldMapSingle({d,x,y,citiesStatus}) {

const [tooltipState, setTooltipState] = useState(false);

  return (
    <g key={d.city}>
                  <circle
                    cx={x}
                    cy={y}
                    r={4}
                    onMouseEnter = {() =>setTooltipState(true)}
                    onMouseLeave = {() =>setTooltipState(false)}
                    fill={
                      citiesStatus[d.city] === "open" ? "#1C67FF" : "#868DA2"
                    }
                  />
                  <g>
                    {tooltipState && (
                        <>
                        <rect x={x} y={y} width={100} height={30} fill="#1C67FF" rx="4" />
                        <text x={x + 50} y={y + 20} stroke="#fff" fill="#fff" textAnchor="middle" >{d.city}</text>
                       </>
                     )} 
                  </g>
    </g>
  )
}

export default WorldMapSingle