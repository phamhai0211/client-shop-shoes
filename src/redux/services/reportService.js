import apiClient from "../api/apiClient";

export const ReportService = {
    createReportRank: (date) => apiClient().put("/api/report/rank",date),
    createReportRevenue: (date) => apiClient().put("/api/report/revenue",date),
    createReportStock: () => apiClient().put("/api/report/stock"),
    createReportProfit: () => apiClient().put("/api/report/Profit")
}