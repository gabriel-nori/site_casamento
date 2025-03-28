export interface apiGet<T> {
    row_count: number
    data: T[]
}

export interface ApiPost<T>{}

export interface ApiParams {
    body?: {}
    headers?: Record<string, string>
    query_parameters?: Record<string, string>
    use_authorization?: boolean
}