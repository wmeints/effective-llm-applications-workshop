/**
 * Retrieves the URL of a service by its name from environment variables.
 *
 * On the server the function searches for environment variables in the format `services__[name]__[index]`,
 * where `[name]` is the name of the service and `[index]` is a numeric index starting from 0.
 * It iterates through indices from 0 to 9 and returns the value of the first matching environment variable.
 *
 * @param name - The name of the service to locate.
 * @returns The URL of the service if found, otherwise `undefined`.
 */
export function getServiceUrl(name: string): string {
    if (typeof window === "undefined") {
        // Locate services by reading the location from environment variables.
        // The environment variables look like this: services__[name]__[index].
        for (let index = 0; index < 10; index++) {
            const serviceLocationName = `services__${name}__http__${index}`

            if (process.env[serviceLocationName]) {
                return process.env[serviceLocationName]
            }
        }

        // Use a fallback so we never return a null value
        return `/api/${name}`
    } else {
        // Return the proxy URL when we're rendering on the client.
        return `/api/${name}`
    }
}
