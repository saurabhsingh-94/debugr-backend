const BASE_URL = "http://localhost:3000/api";

const testAdminFlow = async () => {
  try {
    console.log("--- Login as ADMIN ---");
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@debugr.io", password: "adminpassword" })
    });
    const loginData = await loginRes.json();
    const adminToken = loginData.token;
    console.log("Admin Token obtained.");

    console.log("\n--- Admin: Fetch All Reports ---");
    const reportsRes = await fetch(`${BASE_URL}/admin/reports`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${adminToken}` }
    });
    const reportsData = await reportsRes.json();
    console.log(`Found ${reportsData.count} reports.`);

    if (reportsData.count === 0) {
      console.log("No reports to triage. Skipping triage test.");
      return;
    }

    const reportId = reportsData.reports[0].id;

    console.log(`\n--- Admin: Triaging Report ${reportId} ---`);
    const triageRes = await fetch(`${BASE_URL}/admin/reports/${reportId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${adminToken}`
      },
      body: JSON.stringify({ 
        status: "triaged", 
        severity: "high", 
        bounty: 750.50,
        admin_notes: "Valid SQLi found. Awarded bounty." 
      })
    });
    const triageData = await triageRes.json();
    console.log("Triage Response:", triageData);

    if (triageData.success && triageData.report.bounty == 750.50) {
      console.log("\n✅ ADMIN TRIAGE & REWARD TEST PASSED!");
    } else {
      console.log("\n❌ Admin Triage failed.");
    }

  } catch (err) {
    console.error("\n❌ Admin Flow Failed:", err.message);
  }
};

testAdminFlow();
