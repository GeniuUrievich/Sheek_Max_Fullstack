namespace Back.Middleware
{
    public class RoleBasedApiRedirectMiddleware
    {
        private readonly RequestDelegate _next;

        public RoleBasedApiRedirectMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Если не аутентифицирован
            if (!context.User.Identity.IsAuthenticated)
            {
                await _next(context);
                return;
            }

            var path = context.Request.Path.ToString().ToLower();

            // Например, /admin защищен только для Admin
            if (path.StartsWith("/admin") && !context.User.IsInRole("Admin"))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsJsonAsync(new { message = "Access denied (Admin only)" });
                return;
            }

            await _next(context);
        }
    }
}
