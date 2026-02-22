# Specification

## Summary
**Goal:** Fix admin panel URL routing and visibility issues to enable proper access to the admin dashboard.

**Planned changes:**
- Fix TanStack Router configuration to properly handle /admin route with hash-based routing and caffeineAdminToken query parameter
- Make Admin Panel navigation link visible in header for authenticated admin users
- Verify AdminRoute protection component works without interfering with route matching
- Test complete admin panel access flow end-to-end

**User-visible outcome:** Admin users can successfully navigate to the admin panel via direct URL or header link without seeing routing errors, and all admin dashboard tabs are accessible.
