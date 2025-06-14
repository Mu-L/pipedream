import { ConfigurationError } from "@pipedream/platform";
import quickbooks from "../../quickbooks.app.mjs";

export default {
  key: "quickbooks-create-customer",
  name: "Create Customer",
  description: "Creates a customer. [See the documentation](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer#create-a-customer)",
  version: "0.1.10",
  type: "action",
  props: {
    quickbooks,
    displayName: {
      propDefinition: [
        quickbooks,
        "displayName",
      ],
    },
    title: {
      propDefinition: [
        quickbooks,
        "title",
      ],
    },
    givenName: {
      propDefinition: [
        quickbooks,
        "givenName",
      ],
    },
    middleName: {
      propDefinition: [
        quickbooks,
        "middleName",
      ],
    },
    familyName: {
      propDefinition: [
        quickbooks,
        "familyName",
      ],
    },
    suffix: {
      propDefinition: [
        quickbooks,
        "suffix",
      ],
    },
  },
  async run({ $ }) {
    if (
      !this.displayName &&
      (!this.title && !this.givenName && !this.middleName && !this.familyName && !this.suffix)
    ) {
      throw new ConfigurationError("Must provide displayName or at least one of title, givenName, middleName, familyName, or suffix parameters.");
    }

    const response = await this.quickbooks.createCustomer({
      $,
      data: {
        DisplayName: this.displayName,
        Suffix: this.suffix,
        Title: this.title,
        MiddleName: this.middleName,
        FamilyName: this.familyName,
        GivenName: this.givenName,
      },
    });

    if (response) {
      $.export("summary", `Successfully created customer with ID ${response.Customer.Id}`);
    }

    return response;
  },
};
