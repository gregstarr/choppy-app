#!/bin/bash
echo "BUILDING"
npm run build
echo "UPLOADING"
s3cmd --no-mime-magic --acl-public --delete-removed --delete-after sync dist/* s3://site.choppy.pro
echo "UPDATING HEADER"
s3cmd --recursive modify --add-header="Cache-Control:max-age=604800" s3://site.choppy.pro
