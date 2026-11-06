using SmartSpend.Dtos;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.Extensions.AI;
using System.Diagnostics;

namespace SmartSpend.Services
{
    public class ReceiptsService
    {
        private readonly IChatClient _chatClient;

        private const string prompt = """
            Extract data from this receipt image.

            CRITICAL ALIGNMENT INSTRUCTIONS:
            1. Standard receipts printed with multi-line items have the ITEM NAME on the left and `QUANTITY * UNIT_PRICE = TOTAL_PRICE` on the right of the VERY SAME line.
            2. Read line-by-line horizontally. DO NOT skip the first item. Do NOT assign prices from line N to item name on line N+1.
            3. SANITY CHECK: For every item, verify that (quantity * unitPrice) roughly equals totalPrice.
            4.INCLUDE ONLY REAL PURCHASED PRODUCTS/GOODS/SERVICES.
            5. EXCLUDE SUMMARY & TAX LINES: Completely ignore lines like "Podsuma", "SPRZEDAŻ OPODATKOWANA", "PTU C", "SUMA PTU", "SUMA PLN", "RAZEM", "STAWKA", "KARTA", "ROZLICZENIE PŁATNOŚCI". They are NOT items!
            4. DISCOUNTS / OPUST:
                - If a line is a discount (e.g. "OPUST", "RABAT"), apply it to the preceding item's totalPrice, OR record it with quantity 1 and negative totalPrice.
                - Do NOT count discounts or summary amounts as purchased products.



            Respond with ONLY a JSON object, no other text, in this structure:
            {
                "store": string,
                "date": string in YYYY-MM-DD format,
                "items": [
                    {
                        "name": string,
                        "quantity": number,
                        "unitPrice": number,
                        "totalPrice": number
                    }
                ],
                "total": number
            }
            Rules:
            - Copy names and numbers exactly as printed.
            - Numbers use a dot as the decimal separator.
            - If a field is not readable or not visible, use null. Do not guess.
            - Do not invent items that are not on the receipt.
            - Date only in YYYY-MM-DD format
            """;

        public ReceiptsService(IChatClient chatClient)
        {
            _chatClient = chatClient;
        }



        public async Task<ReceiptDto?> ScanReceiptAsync(IFormFile file)
        {
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            byte[] imageBytes = stream.ToArray();

            var options = new ChatOptions { Temperature = 0f };

            var message = new ChatMessage(ChatRole.User, prompt);
                message.Contents.Add(
                    new DataContent(
                        imageBytes,
                        file.ContentType));

            var response = await _chatClient.GetResponseAsync<ReceiptDto>([message], options);

            //Debug.WriteLine(response.Text);


            return response.Result;
        }

    }
}
