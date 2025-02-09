package com.code_fusion.exception;

public class ResourceNotFoundException  extends Exception
{
	private static final long serialVersionUID=1L;
	//generate constructor from super class
	public ResourceNotFoundException(String message)
	{
		super(message);
	}

}
