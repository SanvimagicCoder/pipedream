import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "knack",
  propDefinitions: {
    recordId: {
      type: "string",
      label: "Record ID",
      description:
        `The ID of the record.
        \\
        For more info, see [the Knack API docs.](https://docs.knack.com/docs/finding-record-ids)`,
    },
    recordData: {
      type: "object",
      label: "Record Data",
      description:
        `The record fields to be updated and their new values.
        \\
        For more info, see [the Knack API docs.](https://docs.knack.com/docs/working-with-fields)`,
    },
  },
  methods: {
    getAuthKeys() {
      return {
        applicationId: this.$auth.application_id,
        apiKey: this.$auth.api_key,
      };
    },
    getHeaders() {
      const {
        applicationId, apiKey,
      } = this.getAuthKeys();
      return {
        "X-Knack-Application-Id": applicationId,
        "X-Knack-REST-API-KEY": apiKey,
        "Content-Type": "application/json",
      };
    },
    async httpRequest($, params) {
      const {
        method,
        data,
        objectKey,
        recordId,
      } = params;

      return axios($, {
        url: `https://api.knack.com/v1/objects/${objectKey}/records/${
          recordId ?? ""
        }`,
        method,
        headers: this.getHeaders(),
        data,
      });
    },
  },
};
