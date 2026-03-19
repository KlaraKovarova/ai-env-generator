export const DEMO_DIFF = `diff --git a/src/auth/session.ts b/src/auth/session.ts
index 4a2d9b1..8f3e7c2 100644
--- a/src/auth/session.ts
+++ b/src/auth/session.ts
@@ -12,6 +12,18 @@ export function createSession(userId: string): Session {
   };
 }

+export function refreshSession(session: Session): Session {
+  if (Date.now() > session.expiresAt) {
+    throw new Error("Session expired");
+  }
+  return {
+    ...session,
+    expiresAt: Date.now() + SESSION_TTL_MS,
+    lastRefreshedAt: Date.now(),
+  };
+}
+
 export function invalidateSession(sessionId: string): void {
   sessions.delete(sessionId);
 }
diff --git a/src/auth/middleware.ts b/src/auth/middleware.ts
index 1bc34a2..9d2e5c1 100644
--- a/src/auth/middleware.ts
+++ b/src/auth/middleware.ts
@@ -8,6 +8,9 @@ export async function authMiddleware(req, res, next) {
   const session = getSession(token);
   if (!session) return res.status(401).json({ error: "Unauthorized" });

+  // Automatically refresh session on activity
+  refreshSession(session);
+
   req.user = session.user;
   next();
 }`;

export const DEMO_COMMIT = `feat(auth): add session refresh with automatic middleware integration

Implement session refresh functionality to extend active sessions and
integrate automatic refresh into the auth middleware.

- Add \`refreshSession()\` that extends TTL and sets \`lastRefreshedAt\`
- Throw on expired sessions instead of silently returning stale data
- Auto-refresh sessions on every authenticated request in middleware`;
