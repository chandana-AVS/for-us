import { NextResponse } from "next/server";

export async function GET() {
  const metrics = `
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.184

# HELP http_requests_total Total number of HTTP requests processed
# TYPE http_requests_total counter
http_requests_total{method="GET",handler="/api/health",status="200"} 4120
http_requests_total{method="GET",handler="/api/dashboard",status="200"} 1840
http_requests_total{method="POST",handler="/api/assets",status="201"} 92

# HELP db_query_duration_seconds Latency of database queries
# TYPE db_query_duration_seconds histogram
db_query_duration_seconds_bucket{le="0.005"} 1420
db_query_duration_seconds_bucket{le="0.01"} 2890
db_query_duration_seconds_bucket{le="0.05"} 4100
db_query_duration_seconds_bucket{le="+Inf"} 4120
db_query_duration_seconds_sum 42.8
db_query_duration_seconds_count 4120
`;

  return new NextResponse(metrics, {
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
    },
  });
}
