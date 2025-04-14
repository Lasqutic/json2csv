# JSON to CSV Converter & Archiver

## Description

This Node.js utility provides two main classes:

- **Json2csv** – Converts JSON files to CSV format, allowing optional field filtering.
- **Archiver** – Archives and unarchives files using either `gzip` (default) or `deflate` compression.

This tool is useful for transforming structured JSON into CSV for processing, sharing, or storing, and compressing it efficiently.

---

###  Prepare an input file

The file at `./data/comments.json` with the following contents:

```json
[
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    "postId": 1,
    "id": 2,
    "name": "quo vero reiciendis velit similique earum",
    "email": "Jayne_Kuhic@sydney.com",
    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    "postId": 1,
    "id": 3,
    "name": "odio adipisci rerum aut animi",
    "email": "Nikita@garfield.biz",
    "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  }
]
```

## Expected output

### Console output:

```
CSV created 
Starting archiving: ./data/output.csv in ./data/output.gz
Archive created successfully
Starting unarchiving: ./data/output.gz in ./data/outputgz.csv
Unarchive completed successfully
Starting archiving: ./data/output.csv in ./data/output.deflate
Archive created successfully
Starting unarchiving: ./data/output.deflate in ./data/outputdef.csv
Unarchive completed successfully
```

### Output CSV file:

`output.csv` (and also in `outputgz.csv`, `outputdef.csv`):

```
postId;name;body
1;id labore ex et quam laborum;"laudantium enim quasi est quidem magnam voluptate ipsam eos
tempora quo necessitatibus
dolor quam autem quasi
reiciendis et nam sapiente accusantium"
1;quo vero reiciendis velit similique earum;"est natus enim nihil est dolore omnis voluptatem numquam
et omnis occaecati quod ullam at
voluptatem error expedita pariatur
nihil sint nostrum voluptatem reiciendis et"
1;odio adipisci rerum aut animi;"quia molestiae reprehenderit quasi aspernatur
aut expedita occaecati aliquam eveniet laudantium
omnis quibusdam delectus saepe quia accusamus maiores nam est
cum et ducimus et vero voluptates excepturi deleniti ratione"
```

---

## Notes

- If `filteredFields` is not specified, the converter will use all fields from the first JSON object.
- Both `gzip` and `deflate` are supported compression methods.
- The delimiter is customizable (`,` by default).

