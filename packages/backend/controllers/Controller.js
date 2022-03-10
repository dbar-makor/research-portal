const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const config = require('../config');
const logger = require('../logger');
const global_helper = require('../utils/helpers/global');

class Controller {
	static sendResponse(response, payload) {
		if (payload.data) {
			if (payload.data instanceof Object) {
				response.json(payload.data);
			}
		}
		return response.status(payload.status).end();
	}

	/**
	 * Files have been uploaded to the directory defined by config.js as upload directory
	 * Files have a temporary name, that was saved as 'filename' of the file object that is
	 * referenced in reuquest.files array.
	 * This method finds the file and changes it to the file name that was originally called
	 * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
	 * the filename and its extension
	 * @param request
	 * @param fieldName
	 * @returns {string}
	 */
	static collectFile(request, fieldName) {
		let uploadedFileName = '';
		if (request.files && request.files.length > 0) {
			const fileObject = request.files.find((file) => file.fieldname === fieldName);
			if (fileObject) {
<<<<<<< HEAD
				const fileArray = fileObject.originalname.split('.');
=======
				let fileArray = fileObject.originalname.split('.');
>>>>>>> c7002297c0167df11929209b77da14040815ff78
				let name_file = fileArray[0];
				name_file = name_file.replace(' ', '');
				name_file = name_file.replace('(', '');
				name_file = name_file.replace(')', '');
				fileArray[0] = name_file;
				const extension = fileArray.pop();
				fileArray.push(`_${Date.now()}`);
				uploadedFileName = `${fileArray.join('')}.${extension}`;
				fs.renameSync(
					path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
					path.join(config.FILE_UPLOAD_PATH, uploadedFileName),
				);
			}
		}
		return uploadedFileName;
	}

	static getRequestBodyName(request) {
		const codeGenDefinedBodyName = request.openapi.schema['x-codegen-request-body-name'];
		if (codeGenDefinedBodyName !== undefined) {
			return codeGenDefinedBodyName;
		}
		const refObjectPath = request.openapi.schema.requestBody.content['application/json'].schema.$ref;
		if (refObjectPath !== undefined && refObjectPath.length > 0) {
			return refObjectPath.substr(refObjectPath.lastIndexOf('/') + 1);
		}
		return 'body';
	}

	static collectRequestParams(request) {
		const requestParams = {};

		if (request.headers.bearerAuth) {
			requestParams['bearerAuth'] = request.headers.bearerAuth;
		}

		requestParams['origin'] = request.headers.origin;
		requestParams['device'] = request.headers['user-agent'];
		requestParams['user_ip'] = request.connection.remoteAddress || req.headers['x-forwarded-for'];
		if (request.openapi.schema.requestBody) {
			const { content } = request.openapi.schema.requestBody;
			if (content['application/json'] !== undefined) {
				const requestBodyName = camelCase(this.getRequestBodyName(request));
				requestParams[requestBodyName] = request.body;
			} else if (content['multipart/form-data'] !== undefined) {
				Object.keys(content['multipart/form-data'].schema.properties).forEach((property) => {
					const propertyObject = content['multipart/form-data'].schema.properties[property];
					if (propertyObject.format !== undefined && propertyObject.format === 'binary') {
						requestParams[property] = this.collectFile(request, property);
					} else {
						requestParams[property] = request.body[property];
					}
				});
			}
		}

		if (request.openapi.schema.parameters) {
			request.openapi.schema.parameters.forEach((param) => {
				if (param.in === 'path') {
					requestParams[param.name] = request.openapi.pathParams[param.name];
				} else if (param.in === 'query') {
					requestParams[param.name] = request.query[param.name];
				} else if (param.in === 'header') {
					requestParams[param.name] = request.headers[param.name];
				}
			});
		}
		return requestParams;
	}

	static async handleRequest(request, response, serviceOperation) {
		const serviceResponse = await serviceOperation(this.collectRequestParams(request));
		Controller.sendResponse(response, serviceResponse);
	}
}

module.exports = Controller;
