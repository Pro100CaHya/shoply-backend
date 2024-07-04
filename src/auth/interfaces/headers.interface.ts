export interface IHeaders {
    authorization?: string; // The authorization token, usually a JWT
    'content-type'?: string; // The content type of the request
    'user-agent'?: string; // Information about the client software
    'accept'?: string; // The MIME types that are acceptable for the response
    'accept-encoding'?: string; // The content encoding that is acceptable for the response
    'accept-language'?: string; // The natural languages that are preferred in the response
    'host'?: string; // The domain name of the server
    'referer'?: string; // The address of the previous web page
    'x-forwarded-for'?: string; // The originating IP address of the client
    'x-forwarded-proto'?: string; // The protocol (HTTP or HTTPS) that the client used
    'x-forwarded-host'?: string; // The original host requested by the client
    'x-request-id'?: string; // A unique identifier for the request
    'x-correlation-id'?: string; // A unique identifier for correlating logs and tracing
}