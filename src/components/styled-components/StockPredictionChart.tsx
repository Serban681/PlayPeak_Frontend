'use client';

import { DemandPrediction } from "@/models/ProductVarianceDemand";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

export default function StockPredictionChart({
    customStyles,
    demandPrediction
}: { customStyles?: string; demandPrediction?: DemandPrediction[] }) {
    
    const data = (demandPrediction ?? []).map(pred => ({
        date: pred.date instanceof Date ? pred.date.toISOString().split('T')[0] : String(pred.date),
        actual: pred.isPredicted ? null : pred.noOfOrders,
        predicted: pred.isPredicted ? pred.noOfOrders : null
    }));

    return (
        <div className={`${data.length === 0 ? 'hidden' : 'block'}`}>
            <ResponsiveContainer className={customStyles} width="100%" height={600}>
                <LineChart
                    data={data}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis 
                        dataKey="date"
                        interval={30}
                        tickFormatter={(date) => {
                            return date.slice(0, 7); 
                        }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#65c5c7"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Actual Orders"
                    />

                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#e884d7"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Predicted Orders"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
