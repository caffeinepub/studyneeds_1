# Specification

## Summary
**Goal:** Create a complete Documentation & Cyber Services page with online service request forms, admin management, and backend data storage for government document services, exam forms, and cyber cafe utilities.

**Planned changes:**
- Create DocumentationPage component with hero section, service categories (Government Certificates, ID & Personal Documents, Job/Exam/Education Services, Cyber Cafe & Utility Services), pricing, comparison of online vs centre services, how it works section, why choose us section, terms & conditions, and privacy policy
- Implement service request form with fields for full name, mobile number, service dropdown, mode selection (online/centre visit), document uploads, and message textarea
- Add backend DocumentationRequest data model and functions: createDocumentationRequest (with blob storage for uploaded files), getDocumentationRequests (admin-only), updateDocumentationRequestStatus (admin-only), getDocumentationRequestDocuments (admin-only)
- Create React Query hooks for all documentation request operations
- Build DocumentationRequestsManagement admin component with request table showing name, mobile, service, mode, status, date, and actions
- Create DocumentationRequestDetailModal for viewing complete request details, downloading documents, and updating status
- Add Documentation Requests tab to AdminDashboardPage with summary card
- Add floating WhatsApp button with pre-filled message specific to documentation services
- Update ServicesSection to remove "Coming Soon" from Documentation card and enable navigation to /documentation route
- Apply StudyNeeds theme styling (primary blue #2563eb, secondary orange #f97316) throughout all new components

**User-visible outcome:** Users can browse documentation and cyber services, submit service requests online with document uploads, and contact via WhatsApp or phone. Admins can view all service requests, update statuses, and download uploaded documents through the admin dashboard.
